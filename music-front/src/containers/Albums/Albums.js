import React, {useEffect} from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlbum, fetchAlbums, publishAlbum } from '../../store/actions/albumsActions';
import AlbumCard from '../../components/AlbumCard/AlbumCard';


const Albums = (props) => {   
    const query = props.history.location.search;

    const albums = useSelector(state => state.albums.albums);
    const user = useSelector(state => state.users.user);

    let artistName = '';
    let artistInfo = '';
    if(albums.length>0 && albums[0].artist){
        artistName = albums[0].artist.title;
        artistInfo = albums[0].artist.information;
    }    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAlbums(query));
    }, [dispatch, query]);

    const publishHandler = album => {
        dispatch(publishAlbum(album))
        dispatch(fetchAlbums())
    }
    const deleteHandler = (id) => {
        dispatch(deleteAlbum(id))
        dispatch(fetchAlbums())
    }
    const albumsForAdmin = 
        albums.map(album => (
            <AlbumCard
                key = {album._id}
                id={album._id}
                title={album.title}
                yearOfIssue={album.yearOfIssue}
                image={album.coverImage}
                tracksCount={album.tracksCount}
                published={album.published}
                publishOnClick={()=> {publishHandler(album)}}
                deleteOnClick={()=> {deleteHandler(album._id)}}
                user={user}
            />
        ))
    let albumsUser =[]

    if(user){
        albums.map( album => {
            if(album.published ){ 
                albumsUser.push(album)
            } 
            if(!album.published && album.user===user._id){
                albumsUser.push(album)
                 
            }
        return albumsUser
        })
    }  
    const albumsForUser = 
    albumsUser.map(album => (
            <AlbumCard
                key = {album._id}
                id={album._id}
                title={album.title}
                yearOfIssue={album.yearOfIssue}
                image={album.coverImage}
                tracksCount={album.tracksCount}
                published={album.published}
                user={user}
            />
        ))

  return (
    <>
    <Typography variant="h4">
        Albums
    </Typography>
    { query? ( 
        <Grid container direction="column" spacing={2}>
            <Grid item container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">
                        {artistName}
                    </Typography>
                    <Typography variant="h6">
                       {artistInfo}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container direction="row" spacing={1}>
                {user && user.role ==='admin'?
                        albumsForAdmin : albumsForUser
                    } 
            </Grid>
        </Grid> 
        ):(
        <Grid container direction="row" spacing={1}>
                {user && user.role ==='admin'?
                        albumsForAdmin : albumsForUser
                    } 
        </Grid>   
        )    
    }
          
    </>     
        
  );
};
export default Albums;
