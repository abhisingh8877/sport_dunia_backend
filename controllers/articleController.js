const axios = require('axios');

exports.fetchNews = async (req, res) => {
  try {
   
    const searchQuery = 'latest news';
    const dateRange="";
    const type="news";
    const author="";
    // Make the API request with the required parameters
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        apiKey: process.env.NEWS_API_KEY, // Ensure your API key is set
        q: searchQuery,  // Ensure the 'search' parameter is included
        from: dateRange?.start,
        to: dateRange?.end,
        author: author,
        type: type
      }
    });

    const articles = response.data.articles;

    return res.status(200).json({ articles:articles ,isSuccess:true});

  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ error: 'Error fetching news from API' ,isSuccess:false});
  }
};
