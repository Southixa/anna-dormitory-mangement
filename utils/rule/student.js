const Student = {
    firstname: {
      required: true,
      message: 'ກະລຸນາໃສ່ຊື່',
      trigger: ['blur']
    },
    lastname: {
      required: true,
      message: 'ກະລຸນາໃສ່ນາມສະກຸນ',
      trigger: ['blur']
    },
    gender: {
        required: true,
        message: 'ກະລຸນາເລືອກເພດ',
        trigger: 'blur',
    },
    phone: {
      required: true,
      validator (rule, value) {
          if (!value) {
              return new Error('ກະລຸນາໃສ່ເບີໂທ')
          } else if (!/^\d*$/.test(value)) {
              return new Error('ເບີໂທຄວນເປັນຕົວເລກເທົ່ານັ້ນ')
          }
          return true
          },
          trigger: ['blur']
    },
    email: {
      required: true,
      validator(rule, value) {
          if(!value) {
              return new Error("ກະລຸນາໃສ່ອີເມລ")
          } else if (!(/@gmail.com/i.test(value))){
              return new Error("ກະລຸນາໃສ່ @gmail.com")
          }
          return true
      },
      trigger: ['blur']
    },
    major: {
        required: true,
        message: 'ກະລຸນາເລືອກສາຂາ',
        trigger: 'blur',
    },
    degree: {
        required: true,
        message: 'ກະລຸນາເລືອກລະດັບການສຶກສາ',
        trigger: 'blur',
    }
  };

export default Student;