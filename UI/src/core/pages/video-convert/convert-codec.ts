export const FormatOptions = [
  {
    format: 'mp4',
    video: ['h264', 'hevc', 'mpeg4'],
    audio: ['aac', 'mp3', 'ac3', 'alac']
  },
  {
    format: 'webm',
    video: ['vp8', 'vp9', 'av1'],
    audio: ['opus', 'vorbis']
  },
  {
    format: 'mkv',
    video: ['h264', 'hevc', 'vp8', 'vp9', 'av1', 'mpeg4'],
    audio: ['aac', 'mp3', 'opus', 'vorbis', 'ac3', 'flac', 'pcm_s16le']
  },
  {
    format: 'mov',
    video: ['h264', 'hevc', 'mpeg4', 'prores'],
    audio: ['aac', 'alac', 'pcm_s16le']
  },
  {
    format: 'avi',
    video: ['mpeg4', 'h264', 'hevc'],
    audio: ['mp3', 'ac3', 'pcm_s16le']
  },
  {
    format: 'flv',
    video: ['h264'],
    audio: ['aac', 'mp3']
  },
  {
    format: 'ogv',
    video: ['theora'],
    audio: ['vorbis']
  },
  {
    format: 'wmv',
    video: ['wmv1', 'wmv2', 'wmv3'],
    audio: ['wmav1', 'wmav2']
  },
  {
    format: 'mpg',
    video: ['mpeg1video', 'mpeg2video'],
    audio: ['mp2', 'mp3', 'ac3']
  },
  {
    format: 'gif',
    video: ['gif'],
    audio: []
  }
];