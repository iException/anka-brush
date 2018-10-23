/*
 * 这个是用来操作小程序 canvas 的一个函数库
 * 暂时没找见合适的，自己先凑合写个
 */

module.exports = class Brush {

    /*
 * 这个是用来操作小程序 canvas 的一个函数库
 * 暂时没找见合适的，自己先凑合写个
 */

    constructor (id,_this) {
        this.ctx = _this ? wx.createCanvasContext(id, _this) : wx.createCanvasContext(id)
        try {
            this.ratio = wx.getSystemInfoSync().windowWidth / 750
        } catch (err) {
            console.log(err)
            wx.showToast({
                title: '获取系统信息出错！',
                icon: 'success',
            })
            this.ratio = 1
        }
    }

    rect (...val) {
        // console.log(val, this.ratio, ...val.map(v => v * this.ratio))
        this.ctx.rect(...this.formatParmas(val))
        return this
    }

    setFillStyle (color = '') {
        this.ctx.setFillStyle(color.replace(/tranparent/i, 'rgba(0,0,0,0,0)'))
        return this
    }

    draw (save = true) {
        return new Promise((resolve, reject) => {
            this.ctx.draw(save, resolve)
        })
    }

    /**
     * 绘制图片，绘制区域会根据 ratio 改变
     * 注意：图片的的截取区域不会随 ratio 变化（最后两个参数）
     * 1.9.0 起支持
     * @param val
     * @returns {Brush}
     */
    drawImage (...val) {
        val = val.map((v, index) => {
            if (!isNaN(v) && index >= 5) {
                return this.ratio * v
            } else {
                return v
            }
        })
        this.ctx.drawImage(...val)
        return this
    }

    save () {
        this.ctx.save()
        return this
    }

    beginPath () {
        this.ctx.beginPath()
        return this
    }

    closePath () {
        this.ctx.closePath()
        return this
    }

    moveTo (...val) {
        this.ctx.moveTo(...this.formatParmas(val))
        return this
    }

    lineTo (...val) {
        this.ctx.lineTo(...this.formatParmas(val))
        return this
    }

    stroke () {
        this.ctx.stroke()
        return this
    }

    arc (...val) {
        this.ctx.arc(...val.map((v, index) => {
            if (!isNaN(v) && index < 3) {
                return v * this.ratio
            } else {
                return v
            }
        }))
        return this
    }

    clip () {
        this.ctx.clip()
        return this
    }

    restore () {
        this.ctx.restore()
        return this
    }

    setFontSize (...val) {
        this.ctx.setFontSize(...this.formatParmas(val))
        return this
    }

    setTextAlign (...val) {
        this.ctx.setTextAlign(...val)
        return this
    }

    setTextBaseline (...val) {
        this.ctx.setTextBaseline(...val)
        return this
    }

    font (val) {
        this.ctx.font = val
        return this
    }

    fillText (...val) {
        this.ctx.fillText(...this.formatParmas(val, 1))
        return this
    }

    fill (val) {
        this.ctx.fill()
        return this
    }

    fillRect (...val) {
        this.ctx.fillRect(...val)
        return this
    }

    /**
     * 绘制圆形图
     * @param round eg:[582, 162, 100, 0, 2*Math.PI]
     * @param image eg:[avatar.path, 482, 62, 682, 262, avatar.width, avatar.height]
     * @returns {*}
     */
    drawRoundImage (round, image) {
        // 绘制圆形图片
        return this.save().beginPath().arc(...round).clip().drawImage(...image).restore()
    }

    drawRoundRectImage(round,image) {
        return this.save().drawRoundRect(...round).clip().drawImage(...image).restore()
    }

    drawRoundRect (sX, sY, width, height, round = 0) {
        this.beginPath()
            .moveTo(sX + round, sY)
            .lineTo(sX + width - round, sY)
            .arc(sX + width - round, sY + round, round, -0.5 * Math.PI, 0 * Math.PI)
            .lineTo(sX + width, sY + height - round)
            .arc(sX + width - round, sY + height - round, round, 0, 0.5 * Math.PI)
            .lineTo(sX + round, sY + height)
            .arc(sX + round, sY + height - round, round, 0.5 * Math.PI, 1 * Math.PI)
            .lineTo(sX, sY + round)
            .arc(sX + round, sY + round, round, 1 * Math.PI, 1.5 * Math.PI)
            .closePath()
        return this
    }

    setShadow (...val) {
        this.ctx.setShadow(...this.formatParmas(val))
        return this
    }

    /**
     * 根据比例调整数字参数
     * @param val<Array>
     * @param startIndex<Number>
     */
    formatParmas (val, startIndex = 0) {
        return val.map((v, index) => isNaN(v) || index < startIndex ? v : v * this.ratio)
    }

    clearActions () {
        this.ctx.clearActions()
        return this
    }

    getActions () {
        return this.ctx.getActions()
    }
}
