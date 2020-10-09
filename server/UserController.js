module.exports = {
    getPosts: (req, res) => {
        const db = req.app.get('db');

        db.posts.get_posts()
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err));
    }
}