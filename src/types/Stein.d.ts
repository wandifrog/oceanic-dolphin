type Fish = {
  uuid: string
  komoditas: string
  area_provinsi: string
  area_kota: string
  size: number
  price: number
  tgl_parsed: string
  timestamp: number
}

type GetFish = Fish[]

type GetArea = {
  province: string
  city: string
}

type GetFishSize = {
  size: string
}
