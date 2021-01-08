export const container = (minimized, refHeight = 0) => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.75s cubic-bezier(0.65, 0, 0.35, 1)',
    transform: minimized ? `translateY(${-refHeight - 138}px)` : '',
    position: 'relative'
})

export const name = {
    fontSize: 72,
    maxWidth: 1000,
    margin: 0,
    width: 'calc(100vw - 32px)',
    lineHeight: 1,
    userSelect: 'none',
    cursor: 'pointer'
}

export const links = {
    maxWidth: 1000,
    width: 'calc(100vw - 32px)',
    position: 'relative',
    height: 19
}

export const button = {
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    fontSize: 16,
    fontWeight: 300,
    color: '#000',
    cursor: 'pointer',
    willChange: 'transform, opacity',
    marginRight: 8
}

export const background = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: -1
}

export const desc = {
    maxWidth: 500,
    fontSize: 15,
    color: 'rgb(16, 16, 16)',
    fontWeight: 300,
    willChange: 'transform, opacity'
}

export const ticker = (x) => ({
    opacity: x == 0 ? 1 : 0,
    transform: `translateX(${x*2}px)`,
    position: 'absolute',
    left: 0,
    transition: 'transform 0.3s, opacity 0.3s',
})