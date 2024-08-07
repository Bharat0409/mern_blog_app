import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useSearchParams, Link } from "react-router-dom";

import { API } from '../../../service/api.js';

import Post from "./Post.jsx";

const Posts = () => {

    const[posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || '' });
            if(response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [category])

    return (
        <Grid container spacing={1}>
            {
                posts && posts.length > 0 ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box fontStyle={{ color: '#878787', margin: '30px 80px', fonstsize: 18 }}>
                No data available to display.
                </Box>
            }
        </Grid>
    )
}

export default Posts;