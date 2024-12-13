import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    selectedImage: null,
    uploadedImageId: null,
  },
  reducers: {
    setImageSelected: (state, action) => {
      state.selectedImage = action.payload;
    },
    setUploadedImageId: (state, action) => {
      state.uploadedImageId = action.payload;
    },
  },
});

export const { setImageSelected, setUploadedImageId } = imageSlice.actions;
export default imageSlice.reducer;
