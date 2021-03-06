module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        name: {
            type: type.STRING,
            allowNull: false
        },
        bio: {
            type: type.STRING,
            allowNull: true,
        },
        link_facebook: {
            type: type.STRING,
            allowNull: true
        },
        link_spotify: {
            type: type.STRING,
            allowNull: true
        },
        link_instagram: {
            type: type.STRING,
            allowNull: true
        },
        photo: {
            type: type.STRING,
            allowNull: true
        }
    })
}