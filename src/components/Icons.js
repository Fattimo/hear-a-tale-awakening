const { createIcon, Icon } = require('@chakra-ui/react')
import React from 'react'

export const HomeIcon = createIcon({
  displayName: 'HomeIcon',
  viewBox: '0 0 20 17',
  d: 'M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z',
})

export const HeadphonesIcon = createIcon({
  displayName: 'HeadphonesIcon',
  viewBox: '0 0 20 20',
  d: 'M10 0C4.47778 0 0 4.24211 0 9.47368V16.8421C0 18.5895 1.48889 20 3.33333 20H6.66667V11.5789H2.22222V9.47368C2.22222 5.4 5.7 2.10526 10 2.10526C14.3 2.10526 17.7778 5.4 17.7778 9.47368V11.5789H13.3333V20H16.6667C18.5111 20 20 18.5895 20 16.8421V9.47368C20 4.24211 15.5222 0 10 0Z',
})

export const PlayIcon = createIcon({
  displayName: 'PlayIcon',
  viewBox: '0 0 15 19',
  d: 'M0 0V19L15 9.5L0 0Z',
})

export const PauseIcon = createIcon({
  displayName: 'PauseIcon',
  viewBox: '0 0 24 24',
  d: 'M6 19H10V5H6V19ZM14 5V19H18V5H14Z',
})

export const BookmarkIconUnfilled = createIcon({
  displayName: 'BookmarkIconUnfilled',
  viewBox: '0 0 16 21',
  d: 'M13.7143 0H2.28571C1.02857 0 0.0114288 1.05 0.0114288 2.33333L0 21L8 17.5L16 21V2.33333C16 1.05 14.9714 0 13.7143 0ZM13.7143 17.5L8 14.9567L2.28571 17.5V2.33333H13.7143V17.5Z',
})

export const BookmarkIconFilled = createIcon({
  displayName: 'BookmarkIconFilled',
  viewBox: '0 0 16 21',
  d: 'M0.511429 2.33364V2.33333C0.511429 1.31307 1.3176 0.5 2.28571 0.5H13.7143C14.6856 0.5 15.5 1.31637 15.5 2.33333V20.2355L8.20041 17.0419L8 16.9542L7.79959 17.0419L0.500468 20.2353L0.511429 2.33364Z',
})

export const NoIcon = (props) => (
  <Icon {...props}>
    <line x1="0" y1="24" x2="24" y2="0" stroke="#FD4747" strokeWidth="3" />
  </Icon>
)

export const TouchIcon = (props) => (
  <Icon {...props}>
    <rect width="24" height="24" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_826_35" transform="scale(0.0104167)" />
      </pattern>
      <image
        id="image0_826_35"
        width="96"
        height="96"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE80lEQVR4nO2dS4hcRRSGv46QqJmFoBEkg8EEnYjicyMBNbrw/WJ8kJXgUjDZikKGgKBZiehGd+JGSQyiJgbdDSrRxTgjOhpRFEkgiCbjJGMyRqbHRd2Gmaa7q6rvPfdU1a0PDjTdt07VOf+tus+qbhEWI8DtwB3A9cDVwOXF9wALwB/Az8AsMAl8UXyfGZIWcB+wDzgHLHvaOeC9wker5rZHzzgwg3/S+9k08FitEUTKFuAzqkt8tx0GNtcWTWSMA3PIJb9jp4EdNcUUDc8jn/hu21tLZBHwBvUnv2Ov1xBf0LyEXvI7tkc8ykDZgX+ypoAJYDuwFVhf2Nbiu4liG1+/TwrHGhxbgHncktMG9gNjHv7HgPeLsi51/A1cVTKmqPgUt8T8CtxWop5twG+OdX1Sop6oGMctIZPAZRXUt6Hw5VLnoxXUFzQt3K5wJ4G1Fda7FjcRviHx2xb34zbsVLHnd7Oh8G2r/x6BuoNhH/YDbpkx38Y27AfmdwXrV2UE+13N/TW044ClDWeBi2toR+3Yhp82bqea64BdwFeY+/0LxeedxW82rrW0I9lhaC+Dg55y8LGRwQfx6WIbG9OWtrzsGJMYawR8Xmf5/UPL7+uAQ8CNA7a5CTiIvSfY6rK1NUp+YvBet91Sfpel/Ep7zuLrbkv5H70ii4S/GBz0NZbyX1vKr7QjFl9jlvJ/ekUWCf8yOOiR/kUBOGMpv9LOWHyNWMovekUmgMTV4CKDx2Zbncue9ZXxtwhc5FlfpUgchE8L+JRiXrsBEgKcEvAphXpbJQQ4KuBTCvWzIAkBvhfwKcWsdgMkBPhSwKcUn2s3QIILgX/of+pnw/UUtKy/BdzuKYki0QMWMbcSQucg5polSe4i/B5wp3M0EdICviVcAWbcQ4mXBwhXgHs94oiaXq+l2JAW4LBXBJGzEThJOALMAVd6RZAAT7H6AbkNKQHawBOebU+G3egL8KJ3qxPjNfQEeHWI9ibJhMM2VQuwe6iW1kSIr+e5JHUlIcbgjMStiIwHWQBlsgDKZAGUCfEA5nsQngN+wLzy2LGjwFLF7RIhBQF6cR74hdWiTGMeFAVFqgL04wSrRZnFTOZQo2kC9EJ1CMsC9OYs8B3mwc0MZk7ZFJEcV8rieyuiLjuJmU9wiVzoYaCdaJv9DtwqFn0AaCfYxU5hpkAliXZyXW2KRC9ktRPrY4+XDbbKs6D1wDOYd4I2YV5TP4KZj+vzvuhyhW2S5gCBPOZ8BDhG772kDXwE3OzoS3uv9rFjzhkS4gLgFdyWi2kDHwA3WHxqJ9XHzntlq2IuxX05mm4hPqZ/j9BOqq+pcAtuC2IMsiWMEN3zgbUTGrwAT2Mu1asKYAmzuEdn+QLthNYqwDDnsZupdmbhGsxabrPA2xX6TRqN9T9DNTWyCMoCQBZBXQDIIgRBk0UIhqaKEBRNFCE4miZCkDRJhGBpighB0wQRgid1EaIgZRGiIVURoiJFEaIjJRHUF/0bllREUF9zrgx70E9gWYthYaqBxN4Tnq0+JfUTa0/4DxgVyIcKMfaEN0UyoUhMPWEeuEImDbrE0BOWgIelEhACL+D+14Qayd8pF3o4jOP3PwJ1DTsPSQYdGqPAW5izDe29/h2ExvwQp6l2swkz5j6I+SfUUcxkECkWgOOYl48PYeY2HBesL5PJZDKZTCaTyTSM/wGu90B69HKFHwAAAABJRU5ErkJggg=="
      />
    </defs>
  </Icon>
)
