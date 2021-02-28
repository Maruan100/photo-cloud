import { createAlbum, createPhoto } from "../../graphql/mutations";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { createAlbum as createAlbumMutation } from "@/graphql/mutations";
import { getAlbum as getAlbumQuery } from "@/graphql/queries";
import { listAlbums as listAlbumsQuery } from "@/graphql/queries";
import { createPhoto as createPhotoMutation } from "@/graphql/mutations";
import { v4 as uuidv4 } from "uuid";
import awsconfig from "@/aws-exports";

export const state = {
  error: null,
  albums: null,
};

export const mutations = {
  SET_ALBUMS(state, albums) {
    state.albums = albums;
  },
};

export const actions = {
  async createAlbum({ dispatch }, newAlbum) {
    try {
      await API.graphql(
        graphqlOperation(createAlbumMutation, { input: newAlbum })
      );
      await dispatch("getAlbums");
    } catch (err) {
      console.error(err);
    }
  },
  async getAlbums({ commit }) {
    try {
      const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery));
      commit("SET_ALBUMS", albumsData.data.listAlbums.items);
    } catch (err) {
      console.error(err);
    }
  },
  async getAlbum({}, albumId) {
    try {
      return await API.graphql(
        graphqlOperation(getAlbumQuery, { id: albumId })
      );
    } catch (err) {
      console.error(err);
    }
  },
  async createPhoto(_, data) {
    const {
      aws_user_files_s3_bucket_region: region,
      aws_user_files_s3_bucket: bucket,
    } = awsconfig;
    const { file, type: mimeType, id } = data;
    const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
    const photoId = uuidv4()
    const key = `images/${photoId}.${extension}`;
    const inputData = {
      id: photoId,
      photoAlbumId: id,
      contentType: mimeType,
      fullsize: {
        key,
        region,
        bucket,
      },
    };

    //s3 bucket storage add file to it
    try {
      await Storage.put(key, file, {
        level: "protected",
        contentType: mimeType,
        metadata: { albumId: id, photoId },
      });
      await API.graphql(
        graphqlOperation(createPhotoMutation, { input: inputData })
      );
      return Promise.resolve("success");
    } catch (error) {
      console.error("createPhoto error", error);
      return Promise.reject(error);
    }
  },
};
