const videoContainer = document.querySelector(".video-container");

let api_key = "AIzaSyCwcbj4Fv6Ok5_GxoJzXOFms2RLVNTf8Wo";
let video_url = "https://www.googleapis.com/youtube/v3/videos?";
let channel_url = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_url +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 1000,
      regionCode: "NG",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_url +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      console.log(video_data);
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail" />
        <div class="content">
             <img src="${data.channelThumbnail}" alt="" class="channel-icon" />
             <div class="info">
                 <h4 class="title">
                   ${data.snippet.title}
                 </h4>
                  <p class="channel-name">${data.snippet.channelTitle}</p>
              </div>
        </div>
  </div>
    `;
};

// Search Bar

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
    searchInput.value = "";
  }
});
