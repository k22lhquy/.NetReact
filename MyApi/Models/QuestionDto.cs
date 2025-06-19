namespace QuizApi.Models
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public string Question { get; set; } = "";
        public List<string> Options { get; set; } = new();
        public string Answer { get; set; } = "";
    }
}
