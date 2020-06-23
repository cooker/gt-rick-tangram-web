import defaultSettings from '@/settings'

const title = defaultSettings.title || '后台系统'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}