const filterFeatured = (article) => {
    const {
      body, title, slug, average_rating, _image, _preview, likes_count, created_at, author, updated_at,
    } = article;
 
    let preview =  _preview || "Preview article"
    let image = _image || "https://www.google.com/logos/doodles/2021/krzysztof-kieslowskis-80th-birthday-6753651837109260.5-l.png"
    return {
      preview ,
      image,
      title,
      slug,
      likes_count,
      average_rating,
      created_at,
      author,
      updated_at,
    };
  };
  
  const featured = articles => (
    articles.map((article) => {
      const fa = filterFeatured(article);
      return fa && fa;
    }));
  
  export default featured;
