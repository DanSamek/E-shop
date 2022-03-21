export default async function handler (req, res) {

res.send("User-agent: *\nDisallow: /kosik/\nSitemap: http://127.0.0.1:3000/sitemap.xml")


}