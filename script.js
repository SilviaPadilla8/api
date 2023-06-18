document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("video");
    var playButton = document.getElementById("play");
    var pauseButton = document.getElementById("pause");
    var volumeUpButton = document.getElementById("volume-up");
    var volumeDownButton = document.getElementById("volume-down");
  
    var mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);
  
    mediaSource.addEventListener("sourceopen", function() {
      var sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
  
      playButton.addEventListener("click", function() {
        video.play();
      });
  
      pauseButton.addEventListener("click", function() {
        video.pause();
      });
  
      volumeUpButton.addEventListener("click", function() {
        if (video.volume < 1) {
          video.volume += 0.1;
        }
      });
  
      volumeDownButton.addEventListener("click", function() {
        if (video.volume > 0) {
          video.volume -= 0.1;
        }
      });
  
      // Cargar el archivo de video desde una carpeta local
      var fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "video/mp4";
  
      fileInput.addEventListener("change", function(event) {
        var file = event.target.files[0];
  
        if (file) {
          var reader = new FileReader();
          reader.onload = function() {
            var videoData = new Uint8Array(reader.result);
            sourceBuffer.addEventListener("updateend", function() {
              if (!sourceBuffer.updating && mediaSource.readyState === "open") {
                mediaSource.endOfStream();
                video.play();
              }
            });
            sourceBuffer.appendBuffer(videoData);
          };
  
          reader.readAsArrayBuffer(file);
        }
      });
  
      var videoContainer = document.getElementById("video-container");
      videoContainer.appendChild(fileInput);
    });
  
    mediaSource.addEventListener("error", function(error) {
      console.error("Error al cargar el archivo de video:", error);
    });
  });
  