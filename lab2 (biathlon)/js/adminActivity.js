function validateForm(){
	var newsText = document.getElementById('newsText');
	var newsTitle = document.getElementById('newsTitle');
	if (newsTitle.value.trim() ==='' && newsText.value.trim()===''){
		alert("Please input text and title");
	}else if(newsTitle.value.trim() ===''){
		alert("Please input title");
	}else if(newsText.value.trim()===''){
		alert("Please input text");
	}else{
		alert('Ok, news is successfully sent')
		newsText.value=''
		newsTitle.value=''
	}
}

