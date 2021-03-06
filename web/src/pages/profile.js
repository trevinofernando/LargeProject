import React, { useContext, useState, useEffect  } from 'react';
import {grabAllPosts} from '../utils/apiCalls';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import HomeButton from '../components/buttons/homeButton';
import Header_component from '../components/header/Header_component';

export default props => {
    const token = localStorage.getItem('token');
    const [posts,setPosts] = useState([]);

    const postsHandler = async() => {
        let result =  await grabAllPosts(token, localStorage.getItem('usernameFriend')).then(ble => ble) 
        console.log('fetching posts', result);
        setPosts(result);
    }

    useEffect(()=>{//This will run once and then only if token changes
        if(token === null){ //If token is lost 
            alert("Please Login to verify your identity\nYou will now be redirected to the Login page.");
            logout();
        }
        
        postsHandler();
    }, [token]);

    const logout = async() =>{
        localStorage.clear();
        props.history.push("/");
    }

    return (
    <div className="App">
        <Header_component props={props}/>
        <h1 className="m-3 text-center">{localStorage.getItem('usernameFriend')===''? localStorage.getItem('username') : localStorage.getItem('usernameFriend')}'s Profile</h1>
        <AddPost id="add_post"/>
        {
                posts.map((value) => {
                    return (
                        <Post   key={value.post_id} 
                                id={value.post_id} 
                                image_url={value.image_url}
                                time_created={value.time_created}
                                num_likes={value.num_likes}
                                num_comments={value.num_comments}
                                username={localStorage.getItem('usernameFriend')}  
                                content={value.content}/>
                    );
                })
            }
        <HomeButton path='/home' {...props}>Home</HomeButton>
    </div>
    )
}