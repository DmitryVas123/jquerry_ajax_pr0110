$(document).ready(function() {
  $(".getNewsBtn").click(function() {
      getNews($(this).prev('input').val(), $(this).prev('input').attr('id'));
  });

  function getNews(query, searchType) {
      let apiKey = "12624f3f3b2b457cb8bd9a16712b2824";
      let url;

      switch (searchType) {
          case "newsSource":
              url = `https://newsapi.org/v2/top-headlines?sources=${query}&apiKey=${apiKey}`;
              break;
          case "keyword":
              url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
              break;
          case "category":
              url = `https://newsapi.org/v2/top-headlines?category=${query}&apiKey=${apiKey}`;
              break;
          default:
              console.log("Invalid search type");
              return;
      }

      $.ajax({
          url: url,
          type: "GET",
          dataType: 'json',
          success: function(data) {
              displayNews(data);
          },
          error: function(xhr, status, error) {
              console.log(xhr.status + " " + xhr.statusText);
              console.log(error);
          }
      });

      function displayNews(data) {
          let newsContainer = $("#news-container");
          newsContainer.empty();

          if (data.articles.length === 0) {
              newsContainer.html("<p>No news found.</p>");
              return;
          }

          for (let i = 0; i < data.articles.length; i++) {
              let article = data.articles[i];
              let newsInfo = `
                  <div class="article">
                      <h2>${article.title}</h2>
                      <p>${article.description}</p>
                      <a href="${article.url}" target="_blank">Read more</a>
                  </div>
              `;
              newsContainer.append(newsInfo);
          }
      }
  }
});
