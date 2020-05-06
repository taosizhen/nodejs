<template>
  <div class="about">
     <Upload
        multiple
        type="drag"
        action="http://192.168.0.106:3000/fileList">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
    <Upload
        multiple
        action="http://192.168.0.106:3000/fileList/upload">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
  </div>
</template>
