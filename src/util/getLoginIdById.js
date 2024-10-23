import axios from "axios";

const getWriter = async (memberId) => {
    try{
        const {data,status} = await axios.get(`/member/${memberId}`);
        if(status === 200){
            console.log("getWriter: ", data);
            return data; // 회원 객체 반환
        }
    } catch(error){
        console.log("getWriter 에러: ",error);
    }
}

export default getWriter;