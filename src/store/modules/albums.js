import { createAlbum } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { createAlbum as createAlbumMutation } from "@/graphql/mutations";
import { getAlbum as getAlbumQuery } from "@/graphql/queries";
import { listAlbums as listAlbumsQuery } from "@/graphql/queries";

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
  async createAlbum({dispatch}, newAlbum) {
    try {
      await API.graphql(
        graphqlOperation(createAlbumMutation, { input: newAlbum })
      );
      await dispatch("getAlbums")
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
      await API.graphql(graphqlOperation(getAlbumQuery, { id: albumId }));
    } catch (err) {
      console.error(err);
    }
  },
};