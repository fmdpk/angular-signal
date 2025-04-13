import { Component, OnInit } from '@angular/core';
import * as jalaali from 'jalaali-js';

@Component({
  selector: 'app-persian-holidays',
  standalone: true,
  imports: [],
  templateUrl: './persian-holidays.component.html',
  styleUrl: './persian-holidays.component.scss',
})
export class PersianHolidaysComponent implements OnInit {
  holidays = [
    '۱ فروردین جشن نوروز/جشن سال نو',
    '۲ فروردین عیدنوروز',
    // '۲ فروردین شهادت حضرت علی علیه السلام [ ٢١ رمضان ]',
    '۳ فروردین عیدنوروز',
    '۴ فروردین عیدنوروز',
    '۱۱ فروردین عید سعید فطر [ ١ شوال ]',
    '۱۲ فروردین روز جمهوری اسلامی',
    // '۱۲ فروردین تعطیل به مناسبت عید سعید فطر [ ٢ شوال ]',
    '۱۳ فروردین جشن سیزده به در',
    '۴ اردیبهشت شهادت امام جعفر صادق علیه السلام [ ٢٥ شوال ]',
    '۱۴ خرداد رحلت حضرت امام خمینی',
    '۱۵ خرداد قیام 15 خرداد',
    '۱۶ خرداد عید سعید قربان [ ١٠ ذوالحجه ]',
    '۲۴ خرداد عید سعید غدیر خم [ ١٨ ذوالحجه ]',
    '۱۴ تیر تاسوعای حسینی [ ٩ محرم ]',
    '۱۵ تیر عاشورای حسینی [ ١٠ محرم ]',
    '۲۳ مرداد اربعین حسینی [ ٢٠ صفر ]',
    '۳۱ مرداد رحلت رسول اکرم؛شهادت امام حسن مجتبی علیه السلام [ ٢٨ صفر ]',
    '۲ شهریور شهادت امام رضا علیه السلام [ ٣٠ صفر ]',
    '۱۰ شهریور شهادت امام حسن عسکری علیه السلام [ ٨ ربيع الاول ]',
    '۱۹ شهریور میلاد رسول اکرم و امام جعفر صادق علیه السلام [ ١٧ ربيع الاول ]',
    '۳ آذر شهادت حضرت فاطمه زهرا سلام الله علیها [ ٣ جمادي الثانيه ]',
    '۱۳ دی ولادت امام علی علیه السلام و روز پدر [ ١٣ رجب ]',
    '۲۷ دی مبعث رسول اکرم (ص) [ ٢٧ رجب ]',
    '۱۵ بهمن ولادت حضرت قائم عجل الله تعالی فرجه و جشن نیمه شعبان [ ١٥ شعبان ]',
    '۲۲ بهمن پیروزی انقلاب اسلامی',
    '۲۰ اسفند شهادت حضرت علی علیه السلام [ ٢١ رمضان ]',
    '۲۹ اسفند روز ملی شدن صنعت نفت ایران',
  ];

  ngOnInit(): void {
    this.createHolidays();
  }

  persianToGregorian(persianDate: any) {
    const persianMonths = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ];

    const monthIndex = persianMonths.indexOf(persianDate.month.trim());
    if (monthIndex === -1) throw new Error('Invalid Persian month');

    const gregorian = jalaali.toGregorian(
      parseInt(persianDate.year),
      monthIndex + 1,
      parseInt(persianDate.day)
    );

    return `${gregorian.gy}/${gregorian.gm}/${gregorian.gd}`;
  }

  getMonthIndex(month: string) {
    const persianMonths = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ];
    return persianMonths.indexOf(month.trim());
  }

  createHolidays() {
    let days: any[] = [];
    this.holidays.forEach((holiday) => {
      let day = this.getEnglishDigit(holiday.split(' ')[0]);
      let month = holiday.split(' ')[1];
      const gregorianDate = this.persianToGregorian({
        day: day,
        month: month,
        year: '1404',
      });
      const monthIndex = this.getMonthIndex(month.trim());
      days.push({
        gregorian: gregorianDate,
        persian: `${1404}/${monthIndex + 1}/${day}`,
      });
    });
    console.log(days);
  }

  getEnglishDigit(str: string) {
    var persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ],
      arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ];

    if (typeof str === 'string') {
      for (var i = 0; i < 10; i++) {
        str = str
          .replace(persianNumbers[i], i.toString())
          .replace(arabicNumbers[i], i.toString());
      }
    }
    return str;
  }
}
