import axios from 'axios';

const instance = axios.create({
    baseURL: 'api'
})

export const fetchUser = async() => {
    const { data } = await instance.get('user');
    return data;
}

export const fetchDiary = async() => {
    const { data } = await instance.get('diary');
    return data;
}

export const postDiary = async({ title, privacy, notes, id, userId, createdDate, createdTime }) => {
    const res = await instance.post('newdiary', {
        title       : title,
        privacy     : privacy,
        notes       : notes,
        id          : id,
        userId      : userId,
        createdDate : createdDate,
        createdTime : createdTime
    })
    .catch(err => console.log(err))

    return res;
}

export const postUser = async({ username, email, password, id }) => {
    const res = await instance.post('newuser', {
        username : username,
        email    : email,
        password : password,
        id       : id,
        matched  : false
    })
    .catch(err => console.log(err))

    return res;
}