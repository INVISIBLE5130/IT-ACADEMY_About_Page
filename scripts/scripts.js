  var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU1ZGZhZGY0NzEwZGZjZjU1MTE0OTgyNjU4MDdiNWNmZjUzNjQ5ZjJjNjNjZWVlYTcwYjg2ZDgxNTQ5NDcxZTVjYWM2N2FmZmMzNWNkNGU1In0.eyJhdWQiOiIxMCIsImp0aSI6IjU1ZGZhZGY0NzEwZGZjZjU1MTE0OTgyNjU4MDdiNWNmZjUzNjQ5ZjJjNjNjZWVlYTcwYjg2ZDgxNTQ5NDcxZTVjYWM2N2FmZmMzNWNkNGU1IiwiaWF0IjoxNTc0MjI5NzY3LCJuYmYiOjE1NzQyMjk3NjcsImV4cCI6MTg4OTg0ODk2Nywic3ViIjoiMTk3MSIsInNjb3BlcyI6WyJ1c2VyQmFzZUluZm8iLCJ1c2VyRGV0YWlsZWRJbmZvIiwidXNlckNvdXJzZUluZm8iXX0.u1cviciTvfS06oHitw1e7CwfHI4sGFE6Y-X3_OHiEOsDv0lUc3_LBKlqw-82pasUvgsBJQNO2lW08eVQYqwplDvT5ZXToWS_ufD3BF8m_06Q9l4MVKOSRs37mlFCU6N-sApN4LS1OGlR2d_jJlkmkfVrK1d_q4_W5OOeiOf-tz0UsjS9UbVlRNKy9WoqKR18hp2o11jJRQKyZg70bedLjcF8GGUUmmBRrdXjBCMcRJZiviFKxTRFcrQ39I_FQcxeQHNfEGU9_CncCvi4cDVgV4YZ6zg7_X5aCouLwQ3DaW3UjG9BAzl2vVBJi-Rrj4Td05Yf9lYNXfvbabcVapENYPQ8yhveAg4OMtf6ZFH2laqKL7edylXEhs5Zpa-xrY5gwwfHYNikbS8xxi-sm_wALnN8M7bawwqVd68ICyZRV2ZXrHIG70_pllbILHssIqHSR37DIs7M_izsQ1B7HAK0XRBt8biuIQktF0AgnTJC7syoEXkoDcbfcKbjfn6wYCMiQJSKKALUcI0uA9H4VEZdHxw6uZwfn_UGODw_vFdqex9JZ5Sj43GdU1rtZ4NtnglPIMA4QtYPs8LGc0nnSj7XlsO3vSxN22SKY7iloz8Hu7lkmP7rvlwz4WAtU8z-Ebe2hs0sDbYpEAfdE4cKolJYdzV1hmJTVY0DPZzHjqMnj2A';
  var client = new INTITAClient({
    key: API_KEY,
 });

client.getUserDetails(function (error, data) {
    if (error) { 
      var el = document.getElementById("error");
      el.classList.toggle('show');  //If error
   }                     
    var nameEl=document.getElementById("name");                           //All user data
    nameEl.innerText = data.firstName + " " + data.secondName;
    document.getElementById("avatar").src = data.avatar;
    document.getElementById("address").innerText = data.country + ", " + data.city + ", " + data.address;
    document.getElementById("phone").innerText = data.phone ;
    document.getElementById("email").innerText = data.email;
    document.getElementById("education").innerText = data.education;
    document.getElementById("aboutUs").innerText = data.aboutUs;
    document.getElementById("educationForm").innerText = data.educationForm;
   
  });
  
client.getUserCoursesAndModules(function (error, data) {
  var courseId = data.courses["0"].id;
  client.getCourseModules(courseId, function(error, data){
    var container = document.createElement('div');            //All modules, create elements, add class
    container.className='btn-group-vertical';
    data.forEach(function(element){
      var div = document.createElement('div');
      div.className='btn btn-primary';
      div.innerText = element.title;
      container.appendChild(div);
      var ul = document.createElement('ul');
      ul.className='list-group-item active my show';
      div.appendChild(ul);
      client.getModuleLectures(element.id, function(error, inf) {
        inf.forEach(function(lesson){  
          var lessons = document.createElement('li');      //All occupations, create elements, add class
          // lessons.className='list-group-item li';
          // console.log(error, inf);
          // lessons.innerText = lesson.title;
          // ul.appendChild(lessons);
        });
      });
      div.onclick=function(){                             //Event click
        ul.classList.toggle('show');
      };
      document.getElementById("modules").appendChild(container);
    });
  });
});