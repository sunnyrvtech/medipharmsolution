// enrollment.js

module.exports = {
    adminEnrollmentNotification: function(data) {
      let html = '';
      html+='<h3>'+data.title+'</h3>';
      html+='<div style="width: 500px;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(0,0,0,.125);border-radius: .25rem;">';
      html+='<div style="padding: 20px;border-bottom: 1px solid rgba(0,0,0,.125);">';
      html+='<div style="display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;margin-bottom: 10px;">';
      html+='<label><strong>Course Name:- </strong>'+data.course_name+'</label>';
      html+='</div>';
      html+='<div style="display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;margin-bottom: 10px;">';
      html+='<label><strong>First Name:- </strong>'+data.first_name+'</label>';
      html+='</div>';
      html+='<div style="display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;margin-bottom: 10px;">';
      html+='<label><strong>Last Name:- </strong>'+data.last_name+'</label>';
      html+='</div>';
      html+='<div style="display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;margin-bottom: 10px;">';
      html+='<label><strong>Email:- </strong>'+data.email+'</label>';
      html+='</div>';
      html+='<div style="display: -ms-flexbox;display: flex;-ms-flex-wrap: wrap;flex-wrap: wrap;margin-right: -15px;margin-left: -15px;margin-bottom: 10px;">';
      html+='<label><strong>Phone Number:- </strong>'+data.phone_number+'</label>';
      html+='</div>';
      html+='</div>';
      html+='</div>';
      return {
          html: html
      }
    },
    userEnrolledNotification: function(data) {
       let html = '';
       html+='<h3>Hello '+data.user_name+'</h3>';
       html+='<p>We have added this <b>'+data.course_name+'</b> in your account setting. Please login with your account and check all course modules in your my account setting. For any issue,please contact us at admin@medipharmsolutions.com</p>';
       return {
          html: html
      }
    }
}
