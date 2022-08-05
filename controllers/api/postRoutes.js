const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/:id', withAuth, async (req, res) => {
  try {
   const postData = await Post.findByPk( req.params.id, {
     include: [
       {
         model: User,
         attributes: ['username']
       },
     ],
   });


   const post = postData.get({plain: true});

   res.render('singlePost', {
     ...post,
     logged_in: req.session.logged_in
   });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body,{
      where:{
      id: req.params.id,
      }
    });

    if (!postData) {
      res.status(404).json({message: 'No post found with this ID!'})
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
})


router.post('/:id',  async (req,res) => {
  console.log('Start of post route');
  console.log(req.body);
  try {
    const commentData = await Comment.create({
      text: req.body.text,
      post_id: parseInt(req.body.post_id),
      user_id: req.session.user_id,
    });
    console.log(commentData, 'this is the comment data');
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
