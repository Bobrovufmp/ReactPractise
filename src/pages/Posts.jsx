import React, {useEffect, useMemo, useRef, useState} from "react";
import PostServise from "../API/PostServise";
import {useFetching} from "../hooks/useFetching";
import {getPagesCount} from "../utils/pages";
import {usePosts} from "../hooks/usePosts";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/mymodal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";


function Posts() {


    const [posts, setPosts] = useState( [])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)



    const [fetchPosts, isPostsLoading, postError] =  useFetching( async() => {
        const response = await PostServise.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })
    console.log(totalPages)

    useEffect(() => {
        fetchPosts()

    },[page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(e => e.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className='App'>
            <MyButton onClick={fetchPosts}> Get Posts</MyButton>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}> create user</MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '25px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError && <h1>Error ${postError}</h1>}
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: "center", marginTop: '50px'} }><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"post 1 "}/>
            }
            <Pagination
                page = {page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    )
    //
    // const [title, setTitle] = useState('')
    // const bodyInputRef = useRef();
    // const addNewPost = (e) => {
    //             e.preventDefault()
    //     console.log(title)
    //     console.log(bodyInputRef.current.value)
    //
    //
    // }
    //
    // return (
    //     <div className='App'>
    //         <form>
    //             {/*Управляемый компонент*/}
    //             <MyInput
    //                 value={title}
    //                 onChange={e => setTitle(e.target.value)}
    //                 type='text'
    //                 placeholder='Post name'></MyInput>
    //             {/*Неуправляемый компонент
    //             const bodyInputRef = useRef();
    //             <MyInput
    //                 ref={bodyInputRef}
    //                 type='text'
    //                 placeholder='Post description'></MyInput>*/}
    //             <MyInput
    //                 ref={bodyInputRef}
    //                 type='text'
    //                 placeholder='Post description'></MyInput>
    //
    //             <MyButton onClick={addNewPost}>Add Post</MyButton>
    //         </form>
    //     <PostList posts = {posts} title={'Post list 1'}/>
    //
    //         </div>
    //
    // );

}

export default Posts;