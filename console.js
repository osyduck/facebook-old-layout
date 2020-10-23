let user_id = document.cookie.match(/c_user=([0-9]+)/)[1];
let fb_dtsg = (() => {
  let a = document.body.getElementsByTagName("script");
  for (let b = 0; b < a.length; b++)
    if (a[b].innerText.includes("fb_dtsg")) return a[b].innerText.match(/"name":"fb_dtsg","value":"(.*?)"}/m)[1]
})();
fetch("https://www.facebook.com/api/graphql/", {
  "headers": {
    "accept": "*/*",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://www.facebook.com",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": `av=${user_id}&__user=${user_id}&__a=1&fb_dtsg=${fb_dtsg}&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=CometTrialParticipationChangeMutation&variables={"input":{"change_type":"OPT_OUT","source":"FORCED_GROUP_ADMIN_OPT_OUT","actor_id":"${user_id}","client_mutation_id":"5"}}&server_timestamps=true&doc_id=2317726921658975`,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
})
  .then(res => res.json())
  .then(data => {
    if (data.data.comet_trial_participation_change.success == true) {
      alert("Old Layout Applied, Reloading...");
      location.reload();
    } else {
      alert("Failed to Switch Old Layout");
    }
    //console.log(data);
  })
