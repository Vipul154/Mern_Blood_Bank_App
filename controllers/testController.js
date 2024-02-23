const testController = (request, response) => {
    response.status(200).send({
        message: "Hey, This route is called using the MVC Pattern",
        success: true,
    });
};
module.exports = {testController};