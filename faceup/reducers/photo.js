export default function(photo = [], action) {
    if(action.type == 'addPics') { 
        console.log(action.photo, "ACTION PHOTO ==========>>>>")
        return [...photo, action.photo];
        
      } else {
          return photo;
    } }