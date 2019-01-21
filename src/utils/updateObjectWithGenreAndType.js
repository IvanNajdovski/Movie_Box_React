
export default function updateObject(data, type){
    // const genres = localStorage.getItem("genders");
    // const parced = JSON.parse(genres);
    return data.map(val => {
        // let gender1 = null;
        // for (let genre of parced) {
        //     if (val.genre_ids.includes(genre.id)) {
        //         gender1 = genre.name;
        //         break;
        //     }
        // }
        return {...val,  type: type}

    })
};