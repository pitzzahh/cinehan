import type { UiConfig } from "@oplayer/ui";

export const options: UiConfig = {
    /* Default value, Optional */
    fullscreen: true,
    coverButton: true,
    miniProgressBar: true,
    autoFocus: true,
    forceLandscapeOnFullscreen: true,
    screenshot: false,
    pictureInPicture: true,
    showControls: 'always', // 'played'
    keyboard: { focused: true, global: false },
    settings: ['loop'],
    theme: { primaryColor: '#FD3E01' },
    slideToSeek: 'always', // 'always' | 'long-touch'
    topSetting: false, //show setting icon on appbar
}

