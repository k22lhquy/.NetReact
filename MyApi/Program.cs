using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net.Http;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký CORS để cho phép từ React app (http://localhost:5173)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // React server
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Đăng ký dịch vụ controller + bỏ kiểm tra SSL (chỉ dùng khi test!)
builder.Services.AddControllers();
builder.Services.AddHttpClient("no-ssl-check")
    .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
    {
        ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
    });

var app = builder.Build();

// Kích hoạt CORS trước khi định tuyến
app.UseCors("AllowReactApp");

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
