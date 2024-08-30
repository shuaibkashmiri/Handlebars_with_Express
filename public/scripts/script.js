let setName = document.querySelector(".name");


const getDetails=async()=>{
    try {
            const res=await fetch("/getUserDetails")
            const data=await res.json()
            setName.innerHTML = data.user.fullname;
            console.log(setName)
         
    } catch (error) {
        console.log(error)
    }
}

getDetails();