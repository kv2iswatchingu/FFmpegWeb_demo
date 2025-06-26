export const FormatOptions = [
  {
    format: 'mp4',
    video: ['h264', 'hevc', 'mpeg4'],
    audio: ['aac', 'mp3', 'ac3', 'alac'],
  },
  {
    format: 'webm',
    video: ['vp8', 'vp9', 'av1'],
    audio: ['opus', 'vorbis'],
  },
  {
    format: 'mkv',
    video: ['h264', 'hevc', 'vp8', 'vp9', 'av1', 'mpeg4'],
    audio: ['aac', 'mp3', 'opus', 'vorbis', 'ac3', 'flac', 'pcm_s16le'],
  },
  {
    format: 'mov',
    video: ['h264', 'hevc', 'mpeg4', 'prores'],
    audio: ['aac', 'alac', 'pcm_s16le'],
  },
  {
    format: 'avi',
    video: ['mpeg4', 'h264', 'hevc'],
    audio: ['mp3', 'ac3', 'pcm_s16le'],
  },
  {
    format: 'flv',
    video: ['h264'],
    audio: ['aac', 'mp3'],
  },
  {
    format: 'ogv',
    video: ['theora'],
    audio: ['vorbis'],
  },
  {
    format: 'wmv',
    video: ['wmv1', 'wmv2', 'wmv3'],
    audio: ['wmav1', 'wmav2'],
  },
  {
    format: 'mpg',
    video: ['mpeg1video', 'mpeg2video'],
    audio: ['mp2', 'mp3', 'ac3'],
  },
];

export const VideoResolutionOptions = [
  { label: '7680x4320(16:9)', value: '7680:4320' },
  { label: '5120x2160', value: '5120:2160' }, // 原21:9错误，应为64:27
  { label: '4096x2160', value: '4096:2160' }, // 原17:9错误，应为256:135
  { label: '3840x2400(16:10)', value: '3840:2400' },
  { label: '3840x2160(16:9)', value: '3840:2160' },
  { label: '3840x1660', value: '3840:1660' }, // 原21:9错误，应为192:83
  { label: '3440x1440', value: '3440:1440' }, // 原21:9错误，应为43:18
  { label: '2560x1600(16:10)', value: '2560:1600' },
  { label: '2560x1440(16:9)', value: '2560:1440' },
  { label: '2560x1080', value: '2560:1080' }, // 原21:9错误，应为64:27
  { label: '2048x1080', value: '2048:1080' }, // 原17:9错误，应为256:135
  { label: '1920x1200(16:10)', value: '1920:1200' },
  { label: '1920x1080(16:9)', value: '1920:1080' },
  { label: '1600x900(16:9)', value: '1600:900' },
  { label: '1440x900(16:10)', value: '1440:900' },
  { label: '1280x800(16:10)', value: '1280:800' },
  { label: '1280x720(16:9)', value: '1280:720' },
  { label: '1024x768(4:3)', value: '1024:768' },
  { label: '800x600(4:3)', value: '800:600' },
  { label: '720x480(3:2)', value: '720:480' },
  { label: '720x576(5:4)', value: '720:576' }, // 原3:2错误，应为5:4
  { label: '640x480(4:3)', value: '640:480' },
  { label: '640x360(16:9)', value: '640:360' },
  { label: '320x240(4:3)', value: '320:240' },
];

export const RateControlOptions = [
  { label: '恒定质量(CRF)', value: 'crf' },
  { label: '可变码率(VBR)', value: 'vbr' },
  { label: '平均码率(ABR)', value: 'abr' },
  //{ label: '固定码率(CBR)', value: 'cbr' }
];

export const VideoRatesOptions = [
  { label: '512K', value: 512 },
  { label: '1M', value: 1024 },
  { label: '2M', value: 2048 },
  { label: '4M', value: 4096 },
  { label: '5M', value: 5120 },
  { label: '8M', value: 8192 },
  { label: '10M', value: 10240 },
  { label: '20M', value: 20480 },
  { label: '40M', value: 40960 },
];

export const FramePerSecond = [
  { label: '24', value: 24 },
  { label: '25', value: 25 },
  { label: '30', value: 30 },
  { label: '48', value: 48 },
  { label: '50', value: 50 },
  { label: '60', value: 60 },
  { label: '120', value: 120 },
  { label: '23.98', value: 24000 / 1001 },
  { label: '29.97', value: 30000 / 1001 },
  { label: '59.94', value: 60000 / 1001 },
  { label: '47.952', value: 48000 / 1001 },
];

export const AspectRatioOptions = [
  { label:'自动适配', value:':force_original_aspect_ratio=decrease'},
  { label:'添加黑边', value:':force_original_aspect_ratio=decrease,pad='},
  { label:'放大裁剪', value:':force_original_aspect_ratio=increase,crop='},
  { label:'不做处理', value:'flag_nothing'}
]