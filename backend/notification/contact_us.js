// contact_us.js

module.exports = function(data) {
      let html = '';
      html+='<div style="width: 500px;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: 1px solid rgba(0,0,0,.125);border-radius: .25rem;">';
      html+='<div style="padding: 20px;border-bottom: 1px solid rgba(0,0,0,.125);">';
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
      html+='<div style="padding: 20px;text-align: center;">';
      html+='<div style="">';
      html+='<label><strong>Message:- </strong></label>';
      html+='</div>';
      html+='<div style="">';
      html+='<p>'+data.message+'</p>';
      html+='</div>';
      html+='</div>';
      html+='</div>';
      return {
          html: html
      }
    }
