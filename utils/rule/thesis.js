const Thesis = {
    laoThesisTitle: {
      required: true,
      message: 'ກະລຸນາໃສ່ຊື່ບົດຄົ້ນຄວ້າພາສາລາວ',
      trigger: ['blur']
    },
    thesisType: {
      required: true,
      message: 'ກະລຸນາເລືອກປະເພດບົດຄົ້ນຄວ້າ',
      trigger: ['blur']
    },
    degree: {
        required: true,
        message: 'ກະລຸນາເລືອກລະດັບການສຶກສາ',
        trigger: 'blur',
    },
    advisor: {
        required: true,
        message: 'ກະລຸນາໃສ່ຊື່ອາຈານທີ່ປຶກສາ',
        trigger: 'blur',
    },
    laoAbstract: {
        required: true,
        message: 'ກະລຸນາໃສ່ຄຳນຳພາສາລາວ',
        trigger: 'blur',
    },
    engThesisTitle: {
        required: true,
        message: 'ກະລຸນາໃສ່ຊື່ບົດຄົ້ນຄວ້າພາສາອັງກິດ',
        trigger: ['blur']
    },
    major: {
        required: true,
        message: 'ກະລຸນາເລືອກສາຂາ',
        trigger: 'blur',
    },
    year: {
        required: true,
        message: 'ກະລຸນາເລືອກປີບົດຄົ້ນຄວ້າ',
        trigger: 'blur',
    },
    engAbstract: {
        required: true,
        message: 'ກະລຸນາໃສ່ຄຳນຳພາສາອັງກິດ',
        trigger: 'blur',
    },
  };

export default Thesis;