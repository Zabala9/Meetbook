import { useHistory } from 'react-router-dom';
import './About.css';

function About(){
    const history = useHistory();

    const changeRoute = () => {
        let path = '/feed';
        history.push(path);
    };

    return(
        <div>
            <div id='container-info'>
                <img src='https://meetbook-seeds.s3.us-west-1.amazonaws.com/logo2+m.jpg' width='80px' height='70' id='logo-in-about'></img>
                <label id='label-one-about'>Meetbook is an online social media</label>
                <label id='label-two-about'>that can be access from any computer</label>
                <label id='label-three-about'>with internet connectivity.</label>
            </div>
            <div id='container-it-works'>
                <label id='question-about'>How does Meetbook work?</label>
                <label id='label-one-question'>After register, the users can post text and photos</label>
                <label id='label-two-question'>which are shared with any other user who have an account.</label>
                <div id='container-button'>
                    <a href='https://meetbook.onrender.com' target='blank'>
                        <button id='button-meetbook'>Visit Meetbook!</button>
                    </a>
                </div>
                <div id='container-more-info'>
                    <div id='container-info-posts'>
                        <div id='container-label-one'>
                            <label id='post-info-title'><i className="fa-regular fa-pen-to-square" ></i> Post</label>
                        </div>
                        <label id='info-posts'>
                            The community can share content by creating posts with text, images and videos.
                        </label>
                    </div>
                    <div id='container-info-comments'>
                        <div id='container-label-two'>
                            <label id='comment-info-title'><i className="fa-solid fa-comments"></i> Comment</label>
                        </div>
                        <label id='info-comments'>
                            The community can comment on posts. Comments provide discussion and often humor.
                        </label>
                    </div>
                    <div id='container-info-likes'>
                        <div id='container-label-three'>
                            <label id='like-info-title'><i className="fa-solid fa-thumbs-up"></i> Like</label>
                        </div>
                        <label id='info-likes'>
                            The community can like or unlike a post.
                        </label>
                    </div>
                </div>
            </div>
            <div id='container-info-creator'>
                <div id='label-meet'>
                    <label>Meet the creator!</label>
                </div>
                <label id='name-creator'>Steven Zabala</label>
                <div id='container-links'>
                    <a href='https://www.linkedin.com/in/steven-zabala-4b149b267/' target='blank' >
                        <img src='https://meetbook-seeds.s3.us-west-1.amazonaws.com/linkedin.png' width='50px' height='50px' id='linkedin'></img>
                    </a>
                    <a href='https://github.com/Zabala9' target='blank'>
                        <img src='https://meetbook-seeds.s3.us-west-1.amazonaws.com/github.png' width='50px' height='50px' id='github'></img>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default About;