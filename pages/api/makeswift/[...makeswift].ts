import { MakeswiftApiHandler } from '@makeswift/runtime/next'

export default MakeswiftApiHandler(process.env.MAKESWIFT_SITE_API_KEY!, {
    getFonts: () => [
        {
            family: 'Korolev',
            variants: [
                {weight:'300', style: 'italic'},
                {weight:'300', style: 'normal'},
                {weight:'500', style: 'italic'},
                {weight:'500', style: 'normal'},
                {weight:'700', style: 'italic'},
                {weight:'700', style: 'normal'}
                ]
        },
        {
            family: 'Franklin Gothic URW',
            variants: [
                {style: 'normal', weight:'300'},
                {style: 'normal', weight:'400'},
                {style: 'italic', weight:'400'}
                ]
        }
    ]
})

