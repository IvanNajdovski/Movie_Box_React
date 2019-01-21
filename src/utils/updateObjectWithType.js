export default function updateObjectWithType(data,type){
    return data.map(val => {
        return {...val, type: type}

    })
};