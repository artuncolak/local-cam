class DeviceService {
  async getVideoDevices(): Promise<MediaDeviceInfo[]> {
    return await navigator.mediaDevices.enumerateDevices();
  }
}

export default new DeviceService();
