using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net.Http;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký dịch vụ + bỏ kiểm tra SSL (chỉ dùng khi test!)
builder.Services.AddControllers();
builder.Services.AddHttpClient("no-ssl-check")
    .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
    {
        ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
    });

var app = builder.Build();

// Middleware pipeline
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
