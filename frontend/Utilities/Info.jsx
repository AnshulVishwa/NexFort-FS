export function getValues(){
    return [
        localStorage.getItem("user_name") || "", 
        localStorage.getItem("contact_number") || ""
    ]
}

export function setValues(value1 , value2){
    localStorage.setItem( "user_name" , value1 )
    localStorage.setItem( "contact_number" , value2 )
}