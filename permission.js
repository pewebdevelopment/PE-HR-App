const ROLE = {
    ADMIN: 'admin',
    CANDIDATE: 'candidate'
}  
function rudOnVacancy(user,vacancy){
    return (user.role==ROLE.ADMIN && vacancy.userId==user.id) 
}
function createOnVacancy(user) {
    return (user.role==ROLE.ADMIN)
}
function rudOnCandidate(user,candidate) {
    return (user.role==ROLE.CANDIDATE && candidate.userId==user.id)
}
function createOnCandidate(user) {
    return (user.role==ROLE.CANDIDATE)    
}
function rudOnResponse(user,response) {
    return (user.role==ROLE.CANDIDATE && response.userId==user.id)
}
function createOnResponse(user) {
    return (user.role==ROLE.CANDIDATE)
}
module.exports={
    rudOnCandidate,createOnCandidate,rudOnResponse,createOnResponse,rudOnVacancy,createOnVacancy
}