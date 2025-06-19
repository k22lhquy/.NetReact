using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using QuizApi.Models;
using System.Net.Http;
using System.Web;

namespace QuizApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public QuizController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("no-ssl-check");
        }


        [HttpGet("questions")]
        public async Task<IActionResult> GetQuestions()
        {
            var response = await _httpClient.GetAsync("https://opentdb.com/api.php?amount=5");

            if (!response.IsSuccessStatusCode)
                return StatusCode(500, new { error = "Failed to fetch questions" });

            var json = JObject.Parse(await response.Content.ReadAsStringAsync());
            var results = json["results"];

            var list = new List<QuestionDto>();
            int id = 1;

            foreach (var item in results!)
            {
                string correct = HtmlDecode(item["correct_answer"]!.ToString());
                var incorrectArray = item["incorrect_answers"]!.ToObject<List<string>>()!.Select(HtmlDecode).ToList();

                var options = new List<string>(incorrectArray) { correct };
                Shuffle(options);

                list.Add(new QuestionDto
                {
                    Id = id++,
                    Question = HtmlDecode(item["question"]!.ToString()),
                    Options = options,
                    Answer = correct
                });
            }

            return Ok(list);
        }

        private string HtmlDecode(string input) => HttpUtility.HtmlDecode(input);

        private void Shuffle<T>(IList<T> list)
        {
            var rng = new Random();
            for (int i = list.Count - 1; i > 0; i--)
            {
                int j = rng.Next(i + 1);
                (list[i], list[j]) = (list[j], list[i]);
            }
        }
    }
}
