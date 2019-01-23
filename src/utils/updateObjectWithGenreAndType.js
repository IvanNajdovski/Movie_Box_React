
export default function updateObject(data, type, genres){
    const genresStorage = localStorage.getItem("genders");
    const parced = JSON.parse(genresStorage);
    return data.map(val => {
        if(parced){
            let genreStorage = null;
            for(let genre of parced) {
                if (val.genre_ids.includes(genre.id)) {
                    genreStorage = genre.name;
                    break;
                }
            }
            return {...val,  type: type, genre: genreStorage}
        }else {
            let genreState = null;
            for (let genre of genres) {
                if (val.genre_ids.includes(genre.id)) {
                    genreState = genre.name;
                    break;
                }
            }
            return {...val,  type: type, genre: genreState}
        }
    })
};