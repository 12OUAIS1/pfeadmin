const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
     
      
    },
    password: {
        type: String,
      
    },
    nom_complet: {
        type: String,
        unique: true,
        
    },
    phone: {
        type: String,
        unique: true,
        
    
    },
    address: {
        type: String,
        unique: true,
       
    },
    idNumber: {
        type: String,
        
    },
    rank: {
        type: String,
        
    },
    badgeNumber: {
        type: String,
        unique: true,
        
    },
    imgUrl: {
        type: String, 
        default:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EADsQAAICAQIDBQUFBAsAAAAAAAABAgMEBREGITESE0FRcSJhkbHRMlKBoeEUQlNiFSNDVHJzgpKywfD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AOpAA0yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANbUM7G0/Hd+VPswXTzk/JIpep8U52VKUcaX7NT4KPOT9WBfdvX4Dbbr+aOUTvusl2rLrZPzc2zZw9Wz8OS/Z8q1L7sm5L4MGunAr2h8T05so4+ao05EuSkvsy+jLD8fQAAAAAAAAAAAAAAAAAAAB4uthRVO22SjCCcpN+CR7K3xvlunT68WDad8vbX8sf12Aq+s6nbqmbK6e8YR9muvf7K+poAFiUABQL3wnq8s7HeNky3yKVyb6zj9UUQ3NIzHg6nj5KbXZn7Xvi+T+ZlXTwOXLZ7rzAAAAAAAAAAAAAAAAAApPHUm9Qx4+EauXxZdimceQay8WzblKtr8U/1Aq4ANRAAAAD6lu0l4kV1PBk54WPKXV1x+SM5jx4d3j1QfWMEvgjIQAAAAAAAAAAAAAAAACB4zw5ZOkq6Ed548+29uvZe6f/T/AAJ4+SjGUWpLeLWzTA5KCZ4g0OzTLpWVRcsST9ma59j+V/UhmUAANTAkuH8N52r49XZbhGXbsflFc/ojRppsvtjVTXKyyT2UYrmzoHDmjrSsWXe9mWTbs7HF8l7iKl3v4gAAAAAAAAAAAAAAAAAAAAPklGUXGcVKL5NNb7kHm8K6bktyrVmNNvf+qlvH/ayYyMmjGj2si6uqPnOSRE38U6VU2o3Tt/y4Pb4vYCNlwXHf2c97e+r9TLTwZjJp35d0192EVH8+bMj4ywl0xsjb/Se6+L9Ok13leRX7+yn8mBLYGm4enRccSiMG+sm95P1bNsj8TWtNy2lTmVdt/uzfYf5kgAAAAAAAAAAAAAAAAAANXUc+nTsWWRkS5LlGK6yfkgMmVk04lMrsiarrj1cioapxbdbJ16dDuq/4svtP0XgQ+q6pk6pkd5fLaCfsVx+zBf8AvE0QPd1tl83ZdZOyb6ub3Z4AKgAC4HqyR0/W87T9lTc51r+zse8f0I4EwdC0XiDF1Patrucj+HJ8n/hfiTJyVNppp7Nc1sXHhniJ3uGFqE13nSu5/ve5+8irSAAAAAAAAAAAAA82TjXCU7JKMIptt+COb69qtmq5rse6pguzVHyXn6ssfG2oOrGrwa3tK72rGvCK6L8WUsAACxKAAoAAAAAA8eXX3AEF+4W1j+kcXub5b5NKW7+/H7xOnL9LzZ6fn05UOkJe0vOPivgdOrnGyEZwacZJNNeRFegAAAAAAAADFk29xjXXPpXXKXwW4HOdfynmavk277wU+xH0XIjxu3zk92+b9QWFAAVAAAAAAAAAAAC/8H5TydHhXJ7yok636dV8ygFq4CtffZtO/JwjNfg2n80RVxABAAAAAADS1ptaPmtf3efyAA5iugALEAAUAAAAAAAAAAALFwM2tWuXg8d/8kASi8gAjQAAj//Z',
    }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
