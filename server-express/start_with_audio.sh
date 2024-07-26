docker run -it --rm \
  --device /dev/snd:/dev/snd \  # Grant access to sound devices
  -v /tmp/.X11-unix:/tmp/.X11-unix \  # Share X11 socket for GUI applications (if applicable)
  ${IMAGE_SERVER}
