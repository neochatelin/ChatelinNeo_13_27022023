class API_OBJ{
    urlBase = "http://localhost:3001/api/v1"

    async login(email, password){
        let data = {
            email: email,
            password: password
        }
        const response = await fetch(
            this.urlBase+'/user/login',
            {
              method: 'POST',
              headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data),
            }
          )
        return await response.json()
    }
    signup(email, password, firstName, lastName){
    }
    async profileGetInfo(token){
        const response = await fetch(
            this.urlBase+'/user/profile',
            {
              method: 'POST',
              headers:{
                "Authorization":"Bearer "+ token,
                "Accept": "application/json",
              }
            }
          )
        return await response.json()
    }
    async profile_Edit(token, firstName, lastName){
      let data = {
        firstName: firstName,
        lastName: lastName
      }
      const response = await fetch(
          this.urlBase+'/user/profile',
          {
            method: 'PUT',
            headers:{
              "Authorization":"Bearer "+ token,
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        )
      return await response.json()
    }
}
const api = new API_OBJ();
export default api;