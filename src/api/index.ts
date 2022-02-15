import axios from 'axios'
const baseUrl = 'https://jsonplaceholder.typicode.com/'

export const api = {
  async getImages(
    page = 1,
    limit = 25,
    albumId: string,
    setIsloading: (loading: boolean) => unknown,
    setImages: (images: any) => unknown,
  ) {
    setIsloading(true)
    let { data } = await axios.get(
      baseUrl +
        (+albumId !== 0
          ? `albums/${albumId}/photos?_page=${page}&_limit=${limit}`
          : `photos?_page=${page}&_limit=${limit}`),
    )
    setImages(data)
    setIsloading(false)
  },

  async deleteImage(
    id: number,
    setIsloading: (loading: boolean) => unknown,
    setImages: (images: any) => unknown,
  ) {
    console.log(id)
    if (window.confirm('вы точно хотите удалить это?')) {
      setIsloading(true)
      let { status } = await axios.delete(baseUrl + `photos/${id}`)
      setIsloading(false)
      if (status === 200) {
        setImages((prev: any) => [...prev].filter((e) => e.id != id))
        console.log('типа удалил')
      }
    }
  },
}
