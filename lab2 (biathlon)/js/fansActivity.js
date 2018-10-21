function validateForm(){
	var appealText = document.getElementById('appealText');

	if (appealText.value.trim() ===''){
		alert("Please input appeal text");
		return false
	}else{
		sendAppeal(appealText.value)
		alert('Ok, appeal is successfully sent')
		return false
	}
}

function sendAppeal(appeal){
    var newPost = document.createElement('div');
    newPost.className="fans-appeal"

    var aSubtitle = document.createElement('h5');
    aSubtitle.innerHTML = appeal;

    var dateTime = new Date();
    var aDate = document.createElement('h6');
    aDate.className="time"
    aDate.innerHTML = dateTime.getDate() + '.'
      + (dateTime.getMonth()+1) + '.'
      + dateTime.getFullYear() + ' ' + dateTime.getHours()+':'
      + dateTime.getMinutes();

    var mNickName = document.createElement('h6');
    mNickName.className='nick';  
    mNickName.innerHTML = 'anonim';

    newPost.appendChild(aSubtitle);
    newPost.appendChild(aDate);
    newPost.appendChild(mNickName);
    newPost.appendChild(document.createElement('br'));
    newPost.appendChild(document.createElement('hr'));

    document.getElementById("appeals").appendChild(newPost);
    appealText.value = '';
}
